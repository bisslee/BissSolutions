using Microsoft.AspNetCore.Mvc;
using BissSolutions.Api.Models;
using BissSolutions.Api.Services;

namespace BissSolutions.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;

        public PagesController(IPageService pageService)
        {
            _pageService = pageService;
        }

        /// <summary>
        /// Obtém todas as páginas ativas
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Page>>> GetPages()
        {
            var pages = await _pageService.GetAllPagesAsync();
            return Ok(pages);
        }

        /// <summary>
        /// Obtém uma página por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Page>> GetPage(int id)
        {
            var page = await _pageService.GetPageByIdAsync(id);
            if (page == null)
                return NotFound();

            return Ok(page);
        }

        /// <summary>
        /// Obtém uma página por slug
        /// </summary>
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<Page>> GetPageBySlug(string slug)
        {
            var page = await _pageService.GetPageBySlugAsync(slug);
            if (page == null)
                return NotFound();

            return Ok(page);
        }

        /// <summary>
        /// Cria uma nova página
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Page>> CreatePage(Page page)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdPage = await _pageService.CreatePageAsync(page);
            return CreatedAtAction(nameof(GetPage), new { id = createdPage.Id }, createdPage);
        }

        /// <summary>
        /// Atualiza uma página existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<Page>> UpdatePage(int id, Page page)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedPage = await _pageService.UpdatePageAsync(id, page);
            if (updatedPage == null)
                return NotFound();

            return Ok(updatedPage);
        }

        /// <summary>
        /// Remove uma página (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePage(int id)
        {
            var result = await _pageService.DeletePageAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        /// <summary>
        /// Obtém componentes de uma página
        /// </summary>
        [HttpGet("{pageId}/components")]
        public async Task<ActionResult<IEnumerable<Component>>> GetPageComponents(int pageId)
        {
            var components = await _pageService.GetPageComponentsAsync(pageId);
            return Ok(components);
        }

        /// <summary>
        /// Cria um novo componente para uma página
        /// </summary>
        [HttpPost("components")]
        public async Task<ActionResult<Component>> CreateComponent(Component component)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdComponent = await _pageService.CreateComponentAsync(component);
            return Ok(createdComponent);
        }

        /// <summary>
        /// Remove um componente
        /// </summary>
        [HttpDelete("components/{id}")]
        public async Task<ActionResult> DeleteComponent(int id)
        {
            var result = await _pageService.DeleteComponentAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
