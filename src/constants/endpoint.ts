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
    rejectArtist: (slug: string) => `/cms/artist/v1/reject/${slug}`,
    revisionArtist: (slug: string) => `/cms/artist/v1/need-revision/${slug}`,
    deleteArtist: (slug: string) => `/cms/artist/v1/delete/${slug}`,
    editArtist: (slug: string) => `/cms/artist/v1/edit/${slug}`,
    saveDraftArtist: () => "/cms/artist/v1/new-draft",
    getListArtistSelect: () => `/cms/artist/v1/list-select`,
  },
  categories: {
    getListCategoriesSelect: () => "/cms/categories/v1/list-select",
  },
  user: {
    getMeData: () => "/cms/user/v1/get-me-data",
  },
};
