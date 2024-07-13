using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class UserConstants
    {
        public static List<LoginModel> Users = new()
        {
            new LoginModel(){ Username="Grzegorz",Password="TajneHaslo_1234",Role="Admin"},
            new LoginModel(){ Username="Tomasz",Password="TajneHaslo_1234",Role="User"},
        };
    }
}
