export interface ICreateRoles {
  name: string
  display_name: string | null
  establishment_id: number
  permissions: ICreateRolePermissions[]
}

interface ICreateRolePermissions {
  module_id: number | null
  create: boolean | number | undefined
  read: boolean | number | undefined
  update: boolean | number | undefined
  delete: boolean | number | undefined
}

export interface IRolesListing {
  id: number
  name: string
  display_name: string | null
  description: string | null
  establishment_id: number
  created_by: number | null
  updated_by: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  created_ago: string
  permissions: IRolePermission[]
}
export interface IRolePermission {
  id: number
  name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  created_ago: string
  meta?: IRolePermissionPivot
}
export interface IRolePermissionPivot {
  pivot_role_id: number
  pivot_module_id: number
  pivot_create: number
  pivot_read: number
  pivot_update: number
  pivot_delete: number
}

const defaultRolePermission: IRolePermission[] = [
  {
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
    created_ago: '',
  },
]

export const defaultRoleListing: IRolesListing[] = [
  {
    id: 0,
    name: '',
    display_name: '',
    description: '',
    establishment_id: 0,
    created_by: 0,
    updated_by: 0,
    created_at: '',
    updated_at: '',
    deleted_at: '',
    created_ago: '',
    permissions: defaultRolePermission,
  },
]
