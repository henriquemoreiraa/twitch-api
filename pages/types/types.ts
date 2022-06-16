export type data = { 
    game_id: string;
    game_name: string;
    id: string;
    is_mature: boolean;
    language: string;
    started_at: string;
    thumbnail_url: string;
    title: string;
    type: string;
    user_id: string;
    user_login: string;
    user_name: string;
    viewer_count: number;
  }

  export type categories = {
    box_art_url: string;
    id: string;
    name: string;
  }

  export type userInfo = {
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    display_name: string;
    view_count: number
  }