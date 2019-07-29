using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EHDB.Model;
using System.IO;
using Newtonsoft.Json;
using System.Diagnostics;

namespace EHDB.Controllers
{
    public static class StringExtensions
    {
        public static bool Contains(this string source, string toCheck, StringComparison comp)
        {
            return source?.IndexOf(toCheck, comp) >= 0;
        }
    }
    [Route("/api")]
    [ApiController]
    public class EHApiController : ControllerBase
    {
        private readonly Dictionary<string, string> _catMap = new Dictionary<string, string>()
        {
            {"ct1", "Misc"},
            {"ct2", "Doujinshi"},
            {"ct3", "Manga"},
            {"ct4", "Artist CG"},
            {"ct5", "Game CG"},
            {"ct6", "Image Set"},
            {"ct7", "Cosplay"},
            {"ct8", "Asian Porn"},
            {"ct9", "Non-H"},
            {"cta", "Western"}
        };
        private readonly GalleryDb _galleryDb;

        public EHApiController(GalleryDb galleryDb)
        {
            _galleryDb = galleryDb;
        }

        [HttpGet]
        public ActionResult<GalleryResponse> Index([FromQuery(Name = "page")]int page = 0, [FromQuery(Name = "search")]string search = null, [FromQuery(Name = "cat")]List<string> cat = null)
        {
            var items = _galleryDb.Db
            .Where(it =>
            {
                var fliter = true;
                if (search != null)
                {
                    fliter &= it.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    it.TitleJpn.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    it.Tags.Any(tag => string.Equals(tag.Split(':').LastOrDefault(), search, StringComparison.OrdinalIgnoreCase));
                }
                if (cat != null && cat.Any())
                {
                    fliter &= cat.Select(c => _catMap.GetValueOrDefault(c)).Where(c => c != null).Any(c => it.Category == c);
                }
                return fliter;
            });
            var total = items.Count();
            var result = items.OrderByDescending(it => it.Posted).Skip(page * 20).Take(20).ToList();
            return new ActionResult<GalleryResponse>(new GalleryResponse()
            {
                TotalCount = total,
                CurrentPage = page,
                TotalPage = Convert.ToInt32(Math.Ceiling(Convert.ToDouble(total) / 20D)),
                Items = result,
            });
        }
    }
}
