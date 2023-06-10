import { TypeArtistStatus } from "../utilities/type-utils";

export const endpoint = {
  auth: {
    login: () => "/cms/auth/v1/login",
    login_google: () => "/cms/auth/v1/google-login",
  },
  artist: {
    create_artist: () => `/cms/artist/v1/new`,
    getListArtist: (status: TypeArtistStatus) =>
      `/cms/artist/v1/list/${status}`,
  },
};
