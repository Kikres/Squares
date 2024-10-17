using Microsoft.AspNetCore.Mvc;

namespace Squares.server.Controllers
{
    public class SquareController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
