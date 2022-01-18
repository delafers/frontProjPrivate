import {GetItemsType, instance, APIResponseType} from "./api";
import {AxiosPromise} from "axios";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,
        ).then(response => {
            return response.data
        })
    },
    follow(userId:number) {
        return instance.post<APIResponseType>(`follow/${userId}`, {})
    },
    unfollow(userId:number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    },
    galleryProfile(userId: number) {
        return instance.get(`profile/` + userId)
    }
}