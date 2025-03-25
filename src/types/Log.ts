export interface Log {
    log_id: number
    url_id: string
    device: string
    os: string
    country: string
    city: string
    date: string
    time: string
}

export interface LogInput {
    url_id: string
    device: string | undefined
    os: string | undefined
    country: string | undefined
    city: string | undefined
}