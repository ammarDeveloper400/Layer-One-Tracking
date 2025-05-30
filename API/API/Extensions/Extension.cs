﻿using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.IO.Compression;
using System.Text;

namespace API.Extensions
{
    public static class Extension
    {
        public static int ToInt(this string value) => string.IsNullOrEmpty(value) ? 0 : Convert.ToInt32(value);
        public static T Deserialize<T>(this string obj)
            => JsonConvert.DeserializeObject<T>(obj);
        public static string Encode(this object text)
        {
            if (!string.IsNullOrEmpty(Convert.ToString(text)))
            {
                byte[] buffer = Encoding.UTF8.GetBytes(Convert.ToString(text));
                var ms = new MemoryStream();
                using (var stream = new GZipStream(ms, CompressionMode.Compress, true))
                    stream.Write(buffer, 0, buffer.Length);

                ms.Position = 0;

                var rawData = new byte[ms.Length];
                ms.Read(rawData, 0, rawData.Length);

                var compressedData = new byte[rawData.Length + 4];
                Buffer.BlockCopy(rawData, 0, compressedData, 4, rawData.Length);
                Buffer.BlockCopy(BitConverter.GetBytes(buffer.Length), 0, compressedData, 0, 4);
                string convertedData = Convert.ToBase64String(compressedData);
                convertedData = convertedData.Replace("+", "_@_");
                convertedData = convertedData.Replace("=", "_!_");
                convertedData = convertedData.Replace("/", "_~_");
                return convertedData;
            }
            else
                return string.Empty;
        }

        public static string Decode(this string compressedText)
        {
            if (!string.IsNullOrEmpty(compressedText))
            {
                compressedText = compressedText.Replace("_@_", "+");
                compressedText = compressedText.Replace("_!_", "=");
                compressedText = compressedText.Replace("_~_", "/");
                byte[] compressedData = Convert.FromBase64String(compressedText);
                using var ms = new MemoryStream();
                int dataLength = BitConverter.ToInt32(compressedData, 0);
                ms.Write(compressedData, 4, compressedData.Length - 4);

                var buffer = new byte[dataLength];

                ms.Position = 0;
                using (var stream = new GZipStream(ms, CompressionMode.Decompress))
                {
                    stream.Read(buffer, 0, buffer.Length);
                }
                return Encoding.UTF8.GetString(buffer);
            }
            else
                return string.Empty;
        }

        public static async Task<string> FileUpload(this IFormFile image, string FolderName, string id, string directory)
        {
            string path = Path.Combine(directory, FolderName, id);
            string fileName = image.FileName.AppendTimeStamp();
            CreateDirectory(path, fileName);
            using (Stream fileStream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }
            path = Path.Combine(FolderName, id.ToString(), fileName);
            return path;
        }

        public static string AppendTimeStamp(this string fileName)
        {
            return string.Concat(
                Path.GetFileNameWithoutExtension(fileName),
                DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                Path.GetExtension(fileName)
                );
        }

        private static void CreateDirectory(string path, string fileName)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            if (File.Exists(Path.Combine(path, fileName)))
            {
                File.Delete(Path.Combine(path, fileName));
            }
        }

        public static string Serialize<T>(this T data)
        {
            return JsonConvert.SerializeObject(data, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                },
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Formatting = Formatting.Indented
            });
        }
    }
}
