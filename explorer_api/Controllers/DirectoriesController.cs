
using explorer_api.Database;
using explorer_api.Database.Table;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

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
                var data = Infokes_Explorer.tbl_directories.Where(d => d.directory.Equals(dir == null ? "" : dir)).Select(f => new { f.directory, f.name, f.type }).ToList();
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

        [HttpPost]
        [Route("manage_directory")]
        public async Task<JsonResult> ManageDirectory([FromBody] sp_manage_directory request)
        {
            if (string.IsNullOrEmpty(request.Mtype))
            {
                return Json(new { status = false, message = "Type parameter cannot be NULL" });
            }
            if (string.IsNullOrEmpty(request.Action))
            {
                return Json(new { status = false, message = "Action parameter cannot be NULL" });
            }

            try
            {
                var sql = "CALL sp_manage_directory(@mdir, @mname, @mtype, @action, @target)";

                // Execute the command
                await Infokes_Explorer.Database.ExecuteSqlRawAsync(
                    sql,
                    new NpgsqlParameter("mdir", request.Mdir),
                    new NpgsqlParameter("mname", request.Mname),
                    new NpgsqlParameter("mtype", request.Mtype),
                    new NpgsqlParameter("action", request.Action),
                    new NpgsqlParameter("target", request.Target)
                );

                return Json(new { status = true, message = "Operation completed successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { status = false, message = ex.Message + "\n" + ex.Source + "\n" + ex.StackTrace, request });
            }
        }





    }
}