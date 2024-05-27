import { Image } from "../interfaces"

export const fileUpload = async (file : File): Promise<string>=> {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dqufytide/upload?'
    const formData =  new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body:formData
        })
        if(!resp.ok) throw new Error("Can´t upload the picture 😓")
        const cloudResp : Image = await resp.json()
        return cloudResp.secure_url
    } catch (error) {
        console.error(error)
        throw Error('Something went wrong trying to upload the image')
    }
}