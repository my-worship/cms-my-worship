import { TypeArtistStatus } from "../utilities/type-utils";

export const endpoint = {
  auth: {
    login: () => "/cms/auth/v1/login",
    login_google: () => "/cms/auth/v1/google-login",
  },
  artist: {
    create_artist: () => `/cms/artist/v1/new`,
    getListArtist: (status: TypeArtistStatus, param?: string) =>
      `/cms/artist/v1/list/${status}` + param,
    detailArtistBySlug: (slug: string) => `/cms/artist/v1/detail/${slug}`,
    approveArtist: (slug: string) => `/cms/artist/v1/approved/${slug}`,
    saveDraftArtist: () => "/cms/artist/v1/new-draft",
  },
  user: {
    getMeData: () => "/cms/user/v1/get-me-data",
  },
};
