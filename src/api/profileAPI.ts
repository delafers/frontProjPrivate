import {instance, APIResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type SavePhotosResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotosResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res => res.data)
    },
    updateStatus(status: string, id: number) {
        return instance.put<APIResponseType>(`profile/status/${id}`, {status}).then(res => res.data)
    },
    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`).then(res => res.data)
    }
}