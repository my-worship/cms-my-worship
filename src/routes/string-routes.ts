export class StringRoutes {
  public root() {
    return "/";
  }

  public lyrics() {
    return "/lyrics";
  }

  public artist() {
    return "/artist";
  }

  public detailArtist(slug: string) {
    return "/artist/detail/" + slug;
  }

  public requestArtist() {
    return "/artist/request";
  }
}
