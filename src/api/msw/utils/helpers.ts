import type { ApiResponse } from '../../../models';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createResponse = <T>(
    data: T, 
    successMessage: string, 
    failureMessage?: string, 
    success = true
): ApiResponse<T> => ({
    success,
    successMessage: success ? successMessage : undefined,
    failureMessage: success ? undefined : failureMessage,
    data: success ? data : undefined
});

export const createPaginatedResponse = <T>(
    data: T[], 
    page = 1, 
    limit = 10,
    filteredData: T[], 
    successMessage: string
) => ({
    success: true,
    successMessage,
    data,
    filteredData,
    pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredData.length / limit),
        totalItems: filteredData.length,
        hasNext: page * limit < filteredData.length,
        hasPrev: page > 1,
        limit
    }
});


export const validateRequiredFields = (
    body: Record<string, any>,
    requiredFields: string[]
    ): { isValid: boolean; errors: Array<{ field: string; message: string }> } => {
    const errors: Array<{ field: string; message: string }> = [];
    
    requiredFields.forEach(field => {
        if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        errors.push({
            field,
            message: `${field} is required`
        });
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors
    };
};