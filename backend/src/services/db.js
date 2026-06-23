const { supabaseAdmin } = require('../config/supabaseClient')

// ✅ Generic Supabase CRUD wrapper — use in ALL controllers instead of raw supabase calls
const db = {
  from: (table) => supabaseAdmin.from(table),

  select: async (table, columns = '*', filters = {}) => {
    let query = supabaseAdmin.from(table).select(columns)
    for (const [key, value] of Object.entries(filters)) {
      query = Array.isArray(value) ? query.in(key, value) : query.eq(key, value)
    }
    const { data, error } = await query
    if (error) throw error
    return data
  },

  selectOne: async (table, columns = '*', filters = {}) => {
    let query = supabaseAdmin.from(table).select(columns)
    for (const [key, value] of Object.entries(filters)) {
      query = Array.isArray(value) ? query.in(key, value) : query.eq(key, value)
    }
    const { data, error } = await query.maybeSingle()
    if (error) throw error
    return data
  },

  insert: async (table, data) => {
    const { data: result, error } = await supabaseAdmin.from(table).insert(data).select()
    if (error) throw error
    return result
  },

  upsert: async (table, data, options = {}) => {
    const { data: result, error } = await supabaseAdmin.from(table).upsert(data, options).select()
    if (error) throw error
    return result
  },

  update: async (table, data, filters) => {
    let query = supabaseAdmin.from(table).update(data)
    for (const [key, value] of Object.entries(filters)) query = query.eq(key, value)
    const { data: result, error } = await query.select()
    if (error) throw error
    return result
  },

  delete: async (table, filters) => {
    let query = supabaseAdmin.from(table)
    for (const [key, value] of Object.entries(filters)) query = query.eq(key, value)
    const { error } = await query.delete()
    if (error) throw error
    return true
  },

  // Raw RPC call for stored procedures
  rpc: async (fn, params = {}) => {
    const { data, error } = await supabaseAdmin.rpc(fn, params)
    if (error) throw error
    return data
  },

  // Paginated select
  paginate: async (table, columns = '*', filters = {}, { page = 1, limit = 20, orderBy = 'created_at', ascending = false } = {}) => {
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin.from(table).select(columns, { count: 'exact' })
    for (const [key, value] of Object.entries(filters)) {
      query = Array.isArray(value) ? query.in(key, value) : query.eq(key, value)
    }
    query = query.order(orderBy, { ascending }).range(from, to)

    const { data, error, count } = await query
    if (error) throw error
    return {
      data,
      pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
    }
  }
}

module.exports = db
