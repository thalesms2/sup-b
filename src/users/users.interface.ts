interface IUserDTO {
    username: string
    password: string
    isActive: boolean
    companyId: number
}

interface IUser {
    id: number
    createdAt: Date
    updatedAt: Date
    username: string
    password: string
    isActive: boolean
    companyId: number
}

export { 
    IUserDTO,
    IUser
}