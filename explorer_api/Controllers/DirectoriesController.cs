
using explorer_api.Database;
using explorer_api.Database.Table;
using Microsoft.AspNetCore.Mvc;

namespace explorer_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectoriesController : Controller
    {
        private DatabaseContext Infokes_Explorer;

        public DirectoriesController(DatabaseContext sInfokes_Explorer)
        {
            Infokes_Explorer = sInfokes_Explorer;
        }

        [HttpGet]
        [Route("read_directory")]
        public JsonResult read_directory(string? dir)
        {
            try
            {
                var data = Infokes_Explorer.tbl_directories.Where(d => d.directory.Equals(dir == null ? "" : dir)).Select(f => new { f.name, f.type }).ToList();
                return Json(new { status = true, message = "", data });
            }
            catch (Exception ex)
            {
                return Json(new { status = true, message = ex.Message, data = new List<tbl_directories>() });
            }
        }

        [HttpGet]
        [Route("folder_tree")]
        public JsonResult folder_tree(string? dir)
        {
            try
            {
                var data = Infokes_Explorer.tbl_directories.Where(d => d.type.Equals("FOLDER") && d.directory.Equals(dir == null ? "" : dir)).Select(f => new { f.name, f.directory }).ToList();
                return Json(new { status = true, message = "", data });
            }
            catch (Exception ex)
            {
                return Json(new { status = true, message = ex.Message, data = new List<tbl_directories>() });
            }
        }
    }
}