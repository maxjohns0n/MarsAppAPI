type PhotoParams = {
    roverName: string,
    cameraType: string
}

enum CameraType {
    FHAZ = "FHAZ",
    RHAZ = "RHAZ",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    NAVCAM = "NAVCAM",
    PANCAM = "PANCAM",
    MINITES = "MINITES"
}

type RequestParams = {
    sol?: number,
    camera?: CameraType
}

type PhotoData = {
    id: number,
    sol: number,
    img_src: string,
    earth_date: Date
}

type PhotoResponse = {
    photos: PhotoData[]    
}

export { PhotoParams, CameraType, RequestParams, PhotoResponse }
