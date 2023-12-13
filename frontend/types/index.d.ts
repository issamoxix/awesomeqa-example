export interface TicketType {
    id: string
    msg_id: string
    status: string
    resolved_by: any
    ts_last_status_change: any
    timestamp: string
    context_messages: string[]
}

export interface MessageType {
    id: string
    channel_id: string
    parent_channel_id: any
    community_server_id: string
    timestamp: string
    has_attachment: boolean
    reference_msg_id: any
    timestamp_insert: string
    discussion_id: string
    author_id: string
    content: string
    msg_url: string
    author: Author
}

export interface Author {
    id: string
    name: string
    nickname: string
    color: string
    discriminator: string
    avatar_url: string
    is_bot: boolean
    timestamp_insert: string
}