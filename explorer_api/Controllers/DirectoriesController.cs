
using explorer_api.Database;
using explorer_api.Database.Table;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            try
            {
                var statusParam = new Npgsql.NpgsqlParameter("status", NpgsqlTypes.NpgsqlDbType.Boolean) { Direction = System.Data.ParameterDirection.Output };
                var messageParam = new Npgsql.NpgsqlParameter("message", NpgsqlTypes.NpgsqlDbType.Text) { Direction = System.Data.ParameterDirection.Output };

                await Infokes_Explorer.Database.ExecuteSqlRawAsync(
                    "CALL manage_directory(@p0, @p1, @p2, @p3, @p4, OUT @status, OUT @message)",
                    request.Mdir,
                    request.Mname,
                    request.Mtype,
                    request.Action,
                    request.Target,
                    statusParam,
                    messageParam
                );

                // Get the output parameters
                var status = (bool)statusParam.Value;
                var message = (string)messageParam.Value;

                return Json(new { status, message });
            }
            catch (Exception ex)
            {
                return Json(new { status = false, message = ex.Message });
            }
        }

    }
}