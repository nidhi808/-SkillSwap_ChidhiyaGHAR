import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../../../config/theme.dart';
import '../../../core/api/dio_client.dart';
import '../../../core/api/api_exception.dart';
import '../../../core/models/skill_model.dart';
import '../../../core/models/skill_category_model.dart';
import '../../../core/services/storage_service.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_snackbar.dart';
import '../../../core/widgets/skill_tag_chip.dart';
import '../../../config/api_constants.dart';

class SkillSetupWizard extends ConsumerStatefulWidget {
  const SkillSetupWizard({super.key});

  @override
  ConsumerState<SkillSetupWizard> createState() => _SkillSetupWizardState();
}

class _SkillSetupWizardState extends ConsumerState<SkillSetupWizard> {
  int _step = 0;
  List<SkillModel> _allSkills = [];
  List<SkillCategoryModel> _categories = [];
  bool _loadingSkills = true;

  bool _addingCustomSkill = false;

  @override
  void initState() {
    super.initState();
    _loadSkills();
  }

  Future<void> _loadSkills() async {
    try {
      final api = ref.read(apiProvider);
      final catData = await api.get<Map<String, dynamic>>(ApiConstants.skillCategories);
      final skillData = await api.get<Map<String, dynamic>>(ApiConstants.skillAll);

      if (!mounted) return;
      setState(() {
        _categories = ((catData['categories'] ?? catData['data'] ?? []) as List)
            .map((e) => SkillCategoryModel.fromJson(e as Map<String, dynamic>))
            .toList();
        _allSkills = ((skillData['skills'] ?? skillData['data'] ?? []) as List)
            .map((e) => SkillModel.fromJson(e as Map<String, dynamic>))
            .toList();
        _loadingSkills = false;
      });
    } catch (e) {
      debugPrint('[Wizard] Error loading skills: $e');
      if (!mounted) return;
      setState(() => _loadingSkills = false);
    }
  }

  Future<void> _addCustomSkill() async {
    final query = _searchQuery.trim();
    if (query.isEmpty) return;

    setState(() => _addingCustomSkill = true);
    try {
      final api = ref.read(apiProvider);
      final response = await api.post<Map<String, dynamic>>(
        '/skills/custom',
        data: {'name': query},
      );

      final dynamic rawData = response['data'] ?? response;
      if (rawData != null && rawData is Map<String, dynamic>) {
        final newSkill = SkillModel.fromJson(rawData);

        setState(() {
          // Add to all skills list so it can be selected/rendered
          if (!_allSkills.any((s) => s.id == newSkill.id)) {
            _allSkills.add(newSkill);
          }

          // Automatically select it
          final selectedIds = _step == 0 ? _offeredSkillIds : _wantedSkillIds;
          selectedIds.add(newSkill.id);

          // Clear query
          _searchQuery = '';
          _addingCustomSkill = false;
        });

        if (mounted) {
          AppSnackbar.show(context, message: "Added custom skill: '${newSkill.name}'", type: SnackbarType.success);
        }
      }
    } catch (e) {
      debugPrint('[Wizard] Error adding custom skill: $e');
      if (mounted) {
        setState(() => _addingCustomSkill = false);
        AppSnackbar.show(context, message: "Failed to add custom skill: $e", type: SnackbarType.error);
      }
    }
  }

  List<SkillModel> get _filteredSkills {
    if (_searchQuery.isEmpty) return _allSkills;
    final q = _searchQuery.toLowerCase();
    return _allSkills.where((s) =>
        s.name.toLowerCase().contains(q) ||
        s.tags.any((t) => t.toLowerCase().contains(q))
    ).toList();
  }

  Future<void> _finish() async {
    try {
      final api = ref.read(apiProvider);
      // Save offered skills
      for (final id in _offeredSkillIds) {
        await api.post<Map<String, dynamic>>(
          ApiConstants.skillOffered,
          data: {'skill_id': id, 'proficiency_level': 'intermediate'},
        );
      }
      // Save wanted skills
      for (final id in _wantedSkillIds) {
        await api.post<Map<String, dynamic>>(
          ApiConstants.skillWanted,
          data: {'skill_id': id, 'current_level': 'beginner', 'target_level': 'intermediate'},
        );
      }
      // Mark onboarding complete
      await ref.read(storageServiceProvider).setOnboardingComplete(true);
      if (!mounted) return;
      context.go('/home');
    } on ApiException catch (e) {
      if (!mounted) return;
      AppSnackbar.show(context, message: e.message, type: SnackbarType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // ── Header ─────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Progress indicator
                  Row(
                    children: List.generate(3, (i) {
                      return Expanded(
                        child: Container(
                          height: 4,
                          margin: EdgeInsets.only(right: i < 2 ? 6 : 0),
                          decoration: BoxDecoration(
                            color: i <= _step ? AppTheme.primary : AppTheme.border,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    _step == 0
                        ? 'What can you teach?'
                        : _step == 1
                            ? 'What do you want to learn?'
                            : 'All set!',
                    style: Theme.of(context).textTheme.displayMedium,
                  ).animate().fadeIn(duration: 300.ms),
                  const SizedBox(height: 8),
                  Text(
                    _step == 0
                        ? 'Select skills you can offer to others'
                        : _step == 1
                            ? 'Select skills you want to learn'
                            : 'Review your selections and get started',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppTheme.textSecondary),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ── Content ────────────────────────────────────────
            Expanded(
              child: _step < 2 ? _buildSkillSelection() : _buildSummary(),
            ),

            // ── Bottom actions ─────────────────────────────────
            Padding(
              padding: const EdgeInsets.all(24),
              child: Row(
                children: [
                  if (_step > 0)
                    Expanded(
                      child: AppButton(
                        text: 'Back',
                        isOutlined: true,
                        onPressed: () => setState(() => _step--),
                      ),
                    ),
                  if (_step > 0) const SizedBox(width: 12),
                  Expanded(
                    child: AppButton(
                      text: _step == 2 ? 'Finish Setup' : 'Continue',
                      isGradient: true,
                      onPressed: () {
                        if (_step < 2) {
                          setState(() => _step++);
                        } else {
                          _finish();
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillSelection() {
    final selectedIds = _step == 0 ? _offeredSkillIds : _wantedSkillIds;

    return Column(
      children: [
        // Search bar
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: TextField(
            onChanged: (v) => setState(() => _searchQuery = v),
            decoration: InputDecoration(
              hintText: 'Search skills...',
              prefixIcon: const Icon(Icons.search, size: 20),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
          ),
        ),
        const SizedBox(height: 16),

        if (_loadingSkills)
          const Expanded(child: Center(child: CircularProgressIndicator()))
        else
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  if (_searchQuery.trim().isNotEmpty &&
                      !_allSkills.any((s) => s.name.toLowerCase() == _searchQuery.trim().toLowerCase()))
                    _addingCustomSkill
                        ? const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : ActionChip(
                            avatar: const Icon(Icons.add, size: 16, color: AppTheme.primary),
                            label: Text(
                              "Create '${_searchQuery.trim()}'",
                              style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold),
                            ),
                            backgroundColor: AppTheme.primary.withOpacity(0.1),
                            shape: StadiumBorder(side: BorderSide(color: AppTheme.primary.withOpacity(0.5))),
                            onPressed: _addCustomSkill,
                          ),
                  ..._filteredSkills.map((skill) {
                    final isSelected = selectedIds.contains(skill.id);
                    return SkillTagChip(
                      label: skill.name,
                      selected: isSelected,
                      color: AppTheme.primary,
                      onTap: () {
                        setState(() {
                          if (isSelected) {
                            selectedIds.remove(skill.id);
                          } else {
                            selectedIds.add(skill.id);
                          }
                        });
                      },
                    );
                  }).toList(),
                ],
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildSummary() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Skills You Can Teach', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _allSkills
                .where((s) => _offeredSkillIds.contains(s.id))
                .map((s) => SkillTagChip(label: s.name, selected: true, color: AppTheme.success))
                .toList(),
          ),
          if (_offeredSkillIds.isEmpty)
            Text('No skills selected', style: TextStyle(color: AppTheme.textTertiary)),

          const SizedBox(height: 32),

          Text('Skills You Want to Learn', style: Theme.of(context).textTheme.headlineMedium),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _allSkills
                .where((s) => _wantedSkillIds.contains(s.id))
                .map((s) => SkillTagChip(label: s.name, selected: true, color: AppTheme.secondary))
                .toList(),
          ),
          if (_wantedSkillIds.isEmpty)
            Text('No skills selected', style: TextStyle(color: AppTheme.textTertiary)),
        ],
      ),
    );
  }
}
