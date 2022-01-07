using System;
using System.Collections.Generic;

namespace Piano.Data
{
    public partial class Song
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Author { get; set; }
        public string Data { get; set; } = null!;
        public int? RecommendedAmount { get; set; }
    }
}
