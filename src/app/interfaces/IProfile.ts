export interface IProfile {
    full_name: string
    email: string
    role:string
    image: {
        path: string
    }[]
}
export interface IProfileUpdate {
    full_name: string
    user_image?: string | undefined
}
export interface IAccountPasswordReset {
    current_password: string
    password:string
    password_confirmation: string
}