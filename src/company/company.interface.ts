interface ICompanyDTO {
    doc: string
    name: string
    email: string
    contact: string
    isActive: boolean
}

interface ICompany {
    id: number
    createdAt: Date
    updatedAt: Date
    doc: string
    name: string
    email: string
    contact: string
    isActive: boolean
}

export { 
    ICompanyDTO,
    ICompany
}