import { MusicBrainzApi } from "musicbrainz-api";

export default async function getInfo(req: Request, res: Response) {
  const query = "1c1b50ec-828b-3d7c-9b1b-54cb1fe97d55";
  let albumInfo = ""
  const a = await fetch(`http://musicbrainz.org/ws/2/release-group/${query}?inc=artist-credits`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
        return res.status(200).json(data);
    });
    const cover = await fetch(`http://coverartarchive.org/release-group/${query}`)
  
}
