using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using vehicle_configurator.Models;

namespace vehicle_configurator.Controllers
{
    [Route("api")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public SendMailController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("SendMail")]
        public async Task<IActionResult> SendEmail([FromForm] MailRequest request)
        {
            try
            {
                // Prepare the multipart form data
                var formData = new MultipartFormDataContent();
                formData.Add(new StringContent(request.ToEmail), "ToEmail");
                formData.Add(new StringContent(request.Body), "Body");

                if (request.Attachments != null)
                {
                    foreach (var attachment in request.Attachments)
                    {
                        if (attachment.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await attachment.CopyToAsync(memoryStream);
                                var fileContent = new ByteArrayContent(memoryStream.ToArray());
                                fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                                formData.Add(fileContent, "Attachments", attachment.FileName);
                            }
                        }
                    }
                }

                // Forward the request to the Spring Boot service
                var response = await _httpClient.PostAsync("http://localhost:8080/api/sendMailWithAttachment", formData);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Failed to forward request to Spring Boot service");
                }

                var responseMessage = await response.Content.ReadAsStringAsync();
                return Ok(responseMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
