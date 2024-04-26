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

export { PhotoParams, CameraType, RequestParams }
