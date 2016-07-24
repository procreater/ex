using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using TMM.Models;

namespace TMM.Controllers
{
    [RoutePrefix("products")]   // sayfa
    public partial class ProductsController : BaseController
    {
        private DB db = new DB(); //db

        // GET: Products
        [Route("index")] //indexinde
        public virtual ActionResult Index()
        {
            var product = new Product(); // product değişkenine model yeni nesne olarak oluşturulmuş
            var modelName = product.GetType().ToString().Split('.')[2]; // modelName = product modelını tipini getir stringe çevir split ile 3. indexe ayır
            ViewBag.ModelName = modelName;
            var imageUrlist = new Dictionary<int, string>();
            var documentUrlist = new Dictionary<int, string>();

            var products = db.Products.Include(p => p.ProductCategory).Include(p => p.ProductSubCategory).Where(p => p.LanguageId == LanguageId).ToList();
            ViewBag.Products = products;
            foreach (var prod in products)
            {
                imageUrlist[prod.ProductId] = GetFileUrlIfExists(prod.ProductId, modelName, "img");
                if (imageUrlist[prod.ProductId] == null)
                {
                    imageUrlist[prod.ProductId] = "/lib/tmm/Default/default.jpg";
                }
                documentUrlist[prod.ProductId] = GetFileUrlIfExists(prod.ProductId, modelName, "doc");
            }
            ViewBag.ImageUrlist = imageUrlist;
            ViewBag.DocumentUrlist = documentUrlist;
            return View();
        }

        [Route("test")]
        public virtual ActionResult test()
        {
            var product = new Product();
            var products = db.Products.Include(x => x.ProductCategory).Include(x => x.ProductSubCategory).Where(x => x.LanguageId == LanguageId).ToList();
            ViewBag.Products = products;

            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
