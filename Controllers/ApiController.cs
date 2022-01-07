using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Piano.Data;
using Piano.Objects;
using Piano.Requests;
using Piano.Responses;

namespace Piano.Controllers; 

[ApiController]
[Route("[controller]/[action]")]
[EnableCors]
public class ApiController : ControllerBase {
    [HttpGet]
    public Song DownloadSong([FromQuery] int id) {
        var output = new Song();
        var context = new PianoContext();
        output = context.Songs.First(song => song.Id == id);
        return output;
    }
    
    [HttpGet]
    public List<SongInfo> DownloadSongs() {
        var output = new List<SongInfo>();
        var context = new PianoContext();
        var lsSongInfos = context.Songs.ToList().Select(song => new SongInfo() {
            Author = song.Author ?? "",
            Id = song.Id,
            Name = song.Name,
            RecommendedAmount = song.RecommendedAmount ?? 6
        });
        output = lsSongInfos.ToList();
        return output;
    }
    
    [HttpPost]
    public SimpleResponse UploadSong([FromBody] object body) {
        var output = new SimpleResponse();
        output.Response = "OK";
        var song = JsonConvert.DeserializeObject<SongUploadRequest>(body.ToString() ?? "") ?? new SongUploadRequest();

        var config = Setup.GetAppConfig.PianoConfig;
        if (string.IsNullOrEmpty(song.SecureCode) || song.SecureCode!=config.SecureCode) {
            output.Response = "Please enter correct security code.";
            return output;
        }

        if (string.IsNullOrEmpty(song.Name) || song.Name.Length > 256) {
            output.Response = "Song's name mustn't be null nor can it be longer than 256 characters.";
            return output;
        }
        
        if (!string.IsNullOrEmpty(song.Author) && song.Name.Length > 128) {
            output.Response = "Author's name mustn't be null nor can it be longer than 128 characters.";
            return output;
        }

        if (string.IsNullOrEmpty(song.Data)) {
            output.Response = "Expected Midi file was not found.";
            return output;
        }
        
        var context = new PianoContext();
        var similarSongs = new List<Song>();
        similarSongs = context.Songs.Where(querySong => querySong.Name == song.Name)
            .Where(querySong => querySong.Author == song.Author)
            .ToList();
        if (similarSongs.Count>0) {
            output.Response = "There already exists song with exact same Name & Author.";
            return output;
        }
        
        if (song!=null && song.Data!=string.Empty) {
            if (song.Author == string.Empty) song.Author = null;
            if (song.RecommendedAmount == 6) song.RecommendedAmount = null;
            if (song.RecommendedAmount > 11) song.RecommendedAmount = 11;
            if (song.RecommendedAmount < 6) song.RecommendedAmount = 6;
            context.Songs.Add(new Song() {
                Author = song.Author,
                Data = song.Data,
                Name = song.Name,
                RecommendedAmount = song.RecommendedAmount
            });
            context.SaveChanges();
        }
        else {
            output.Response = "Error: no song data provided. Correct JSON: {name: '', recommendedAmount: 6, data: 'base64midi', author: '', id: 0}";
        }
        return output;
    }
}