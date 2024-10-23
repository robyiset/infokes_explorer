namespace explorer_api.Database.Table
{
    public class sp_manage_directory
    {
        public string Mdir { get; set; }
        public string Mname { get; set; }
        public string Mtype { get; set; }  // "FOLDER" or "FILE"
        public string Action { get; set; }  // "COPY" or "CUT"
        public string Target { get; set; }
    }
}