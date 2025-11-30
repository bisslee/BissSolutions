using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// Lista todos os produtos ativos (público)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BissSolutions.Api.Models.Product>>> GetProducts()
        {
            var products = await _productService.GetAllProductsAsync(includeInactive: false);
            return Ok(products);
        }

        /// <summary>
        /// Obtém um produto por ID (público)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<BissSolutions.Api.Models.Product>> GetProduct(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null || !product.IsActive)
                return NotFound();

            return Ok(product);
        }

        /// <summary>
        /// Lista produtos por categoria (público)
        /// </summary>
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<BissSolutions.Api.Models.Product>>> GetProductsByCategory(string category)
        {
            var products = await _productService.GetProductsByCategoryAsync(category, includeInactive: false);
            return Ok(products);
        }
    }
}

