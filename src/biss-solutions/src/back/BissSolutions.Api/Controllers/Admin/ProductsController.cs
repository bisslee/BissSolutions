using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/products")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// Lista todos os produtos (incluindo inativos para admin)
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] bool includeInactive = true)
        {
            var products = await _productService.GetAllProductsAsync(includeInactive);
            return Ok(products);
        }

        /// <summary>
        /// Obtém um produto por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound(new { message = "Produto não encontrado" });

            return Ok(product);
        }

        /// <summary>
        /// Cria um novo produto
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdProduct = await _productService.CreateProductAsync(product);
                return CreatedAtAction(nameof(GetProduct), new { id = createdProduct.Id }, createdProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao criar produto: {ex.Message}" });
            }
        }

        /// <summary>
        /// Atualiza um produto existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(Guid id, Product product)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedProduct = await _productService.UpdateProductAsync(id, product);
            if (updatedProduct == null)
                return NotFound(new { message = "Produto não encontrado" });

            return Ok(updatedProduct);
        }

        /// <summary>
        /// Deleta um produto (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await _productService.DeleteProductAsync(id);
            if (!result)
                return NotFound(new { message = "Produto não encontrado" });

            return Ok(new { message = "Produto deletado com sucesso" });
        }

        /// <summary>
        /// Ativa/Desativa um produto
        /// </summary>
        [HttpPatch("{id}/toggle-active")]
        public async Task<ActionResult<Product>> ToggleActive(Guid id)
        {
            var result = await _productService.ToggleActiveAsync(id);
            if (!result)
                return NotFound(new { message = "Produto não encontrado" });

            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
        }
    }
}

