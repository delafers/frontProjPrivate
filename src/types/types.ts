export type GalleryType = {
    class: string,
    name: string,
    id: number
}
export type ContactsType = {
    github: string,
    vk: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType,
    aboutMe: string
}
export type PhotosType = {
    small: string | null,
    large: string | null,
}
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
}
export type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}