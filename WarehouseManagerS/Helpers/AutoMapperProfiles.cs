using AutoMapper;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() {
            CreateMap<Product, ProductDto>();
        }
        
    }
}
