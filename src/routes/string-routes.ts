import { TypeArtistStatus } from "../utilities/type-utils";

export class StringRoutes {
  public root() {
    return "/";
  }

  public lyrics() {
    return "/lyrics";
  }

  public artist(status: TypeArtistStatus | ":status") {
    return "/artist/" + status;
  }

  public detailArtist(slug: string) {
    return "/artist/detail/" + slug;
  }

  public requestArtist() {
    return "/artist/request";
  }
}
