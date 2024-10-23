
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace explorer_api.Database.Table
{
    [Table("tbl_directories")]
    public class tbl_directories
    {
        [Key]
        public Guid id { get; set; }
        public string directory { get; set; }
        public string name { get; set; }
        public string type { get; set; }
    }
}