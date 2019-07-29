using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace EHDB.Model
{
    public class GalleryDb
    {
        private readonly List<Gallery> _db;
        private readonly FileStream _stream;
        private readonly StreamReader _streamReader;
        private readonly JsonTextReader _reader;
        private readonly JsonSerializer _serializer;

        public GalleryDb()
        {
            _stream = System.IO.File.OpenRead("gdata.json");
            _streamReader = new StreamReader(_stream);
            _reader = new JsonTextReader(_streamReader);
            _serializer = new JsonSerializer();
            _db = _serializer.Deserialize<Dictionary<string, Gallery>>(_reader).Values.ToList();
        }

        public List<Gallery> Db => _db;
    }
    public class GalleryResponse
    {
        [JsonProperty("totalPage")]
        public int TotalPage { get; set; }
        [JsonProperty("totalCount")]
        public int TotalCount { get; set; }
        [JsonProperty("currentPage")]
        public int CurrentPage { get; set; }
        [JsonProperty("items")]
        public List<Gallery> Items { get; set; }
    }

    public class Gallery
    {
        [JsonProperty("gid")]
        public long Gid { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("archiver_key")]
        public string ArchiverKey { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("title_jpn")]
        public string TitleJpn { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("thumb")]
        public Uri Thumb { get; set; }

        [JsonProperty("uploader")]
        public string Uploader { get; set; }

        [JsonProperty("posted")]
        public long Posted { get; set; }

        [JsonProperty("filecount")]
        public long FileCount { get; set; }

        [JsonProperty("filesize")]
        public long FileSize { get; set; }

        [JsonProperty("expunged")]
        public bool Expunged { get; set; }

        [JsonProperty("rating")]
        public string Rating { get; set; }

        [JsonProperty("torrentcount")]
        public long TorrentCount { get; set; }

        [JsonProperty("tags")]
        public List<string> Tags { get; set; }
    }

}