using System.Data;


namespace Persistence.Context
{
    public interface IDapperContext
    {
        IDbConnection CreateConnection();
    }
}
