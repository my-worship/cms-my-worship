export class StringRoutes {
  public root() {
    return "/";
  }

  public lyrics() {
    return "/lyrics";
  }

  public newLyrics() {
    return "/lyrics/new-request";
  }

  public artist() {
    return "/artist/";
  }

  public detailArtist(slug: string) {
    return "/artist/detail/" + slug;
  }

  public editArtist(slug: string) {
    return "/artist/edit/" + slug;
  }

  public requestArtist() {
    return "/artist/request";
  }
}
