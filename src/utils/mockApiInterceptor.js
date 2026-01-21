/**
 * API Interceptor for Frontend-Only Version
 * Intercepts API calls and returns mock data
 * This allows the frontend to work without a backend
 */

import {
  mockGardens,
  mockSectors,
  mockBlocks,
  mockLots,
  mockDashboardStats,
  mockActivityLogs,
  mockMapUIConfig,
  mockMapMarkers,
  mockSectorPaths,
  mockGetLotsBySector,
  mockGetSectorsByGarden,
  mockGetBlocksBySector
} from './mockData';

/**
 * Mock API fetch interceptor
 * Replaces fetch calls with mock data based on endpoint
 */
export const mockApiFetch = async (url, options = {}) => {
  // Normalize URL
  const normalizedUrl = typeof url === 'string' ? url : url.toString();
  
  // Extract the endpoint (last part after last /)
  const endpoint = normalizedUrl.split('/').pop().split('?')[0];
  const queryString = normalizedUrl.split('?')[1] || '';
  const params = new URLSearchParams(queryString);

  try {
    let mockResponse;

    // Authentication endpoints
    if (endpoint === 'login.php') {
      const body = options.body ? JSON.parse(options.body) : {};
      if (body.username === 'admin' && body.password === 'admin123') {
        mockResponse = {
          success: true,
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@cemetery.com',
            firstname: 'Admin',
            lastname: 'User',
            role: 'admin',
            user_type: 'admin'
          }
        };
      } else {
        mockResponse = {
          success: false,
          message: 'Invalid credentials. Use admin / admin123'
        };
      }
    }

    // Session endpoint
    else if (endpoint === 'session.php') {
      const user = localStorage.getItem('user');
      mockResponse = user ? { success: true, user: JSON.parse(user) } : { success: false };
    }

    // Logout endpoint
    else if (endpoint === 'logout.php') {
      mockResponse = { success: true };
    }

    // Mapping endpoints
    else if (endpoint === 'get_mapping_gardens.php') {
      mockResponse = mockGardens;
    }

    else if (endpoint === 'get_mapping_sectors.php') {
      const garden = params.get('garden');
      mockResponse = mockGetSectorsByGarden(garden);
    }

    else if (endpoint === 'get_mapping_blocks.php') {
      const garden = params.get('garden');
      const sector = params.get('sector');
      mockResponse = mockGetBlocksBySector(garden, sector);
    }

    else if (endpoint === 'get_mapping_available_lots.php') {
      const garden = params.get('garden');
      const sector = params.get('sector');
      mockResponse = mockGetLotsBySector(garden, sector).filter(l => l.status === 'available');
    }

    // Map UI config
    else if (endpoint === 'ui_config.php') {
      mockResponse = mockMapUIConfig;
    }

    // Map markers
    else if (endpoint === 'map_markers.php') {
      mockResponse = mockMapMarkers;
    }

    // Lots endpoints
    else if (endpoint === 'get_lots.php') {
      mockResponse = mockLots;
    }

    else if (endpoint === 'get_lots_by_sector.php') {
      const garden = decodeURIComponent(params.get('garden') || '');
      const sector = decodeURIComponent(params.get('sector') || '');
      const sectorLots = mockGetLotsBySector(garden, sector);
      mockResponse = { lots: sectorLots };
    }

    else if (endpoint === 'sector_paths.php') {
      mockResponse = {
        'Hope Garden': {
          'A': [[14.5990, 120.9840], [14.6000, 120.9840], [14.6000, 120.9850], [14.5990, 120.9850]],
          'B': [[14.5990, 120.9850], [14.6000, 120.9850], [14.6000, 120.9860], [14.5990, 120.9860]]
        },
        'Peace Garden': {
          'C': [[14.5980, 120.9820], [14.5990, 120.9820], [14.5990, 120.9830], [14.5980, 120.9830]],
          'D': [[14.5980, 120.9830], [14.5990, 120.9830], [14.5990, 120.9840], [14.5980, 120.9840]]
        }
      };
    }

    // Dashboard endpoints
    else if (endpoint === 'get_dashboard_stats.php') {
      mockResponse = { success: true, data: mockDashboardStats };
    }

    // Activity logs
    else if (endpoint === 'get_activity_logs.php') {
      mockResponse = { success: true, activityLogs: mockActivityLogs, logs: mockActivityLogs };
    }

    // Users
    else if (endpoint === 'get_users.php') {
      mockResponse = { 
        success: true, 
        users: [
          {
            id: 1,
            username: 'admin_user',
            first_name: 'Admin',
            middle_name: '',
            last_name: 'User',
            email: 'admin@example.com',
            user_type: 'admin',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            username: 'staff_user',
            first_name: 'Staff',
            middle_name: '',
            last_name: 'User',
            email: 'staff@example.com',
            user_type: 'staff',
            created_at: new Date().toISOString()
          }
        ]
      };
    }

    // Backup & Recovery
    else if (endpoint === 'get_retention_settings.php') {
      mockResponse = {
        success: true,
        settings: {
          backup_retention_days: '30',
          auto_cleanup_enabled: '1'
        },
        stats: {
          total_backups: 5,
          expired_backups: 1,
          latest_backup: new Date().toISOString(),
          total_size: '256 MB'
        }
      };
    }

    else if (endpoint === 'get_deleted_records.php') {
      mockResponse = {
        success: true,
        data: {
          users: [],
          lots: [],
          deceased: []
        }
      };
    }

    // Deceased Records
    else if (endpoint === 'get_deceased_records.php') {
      mockResponse = {
        success: true,
        deceased_records: [
          {
            id: 1,
            name: 'Sample Deceased',
            lot_label: 'Plot A-1',
            status: 'Active',
            date_of_death: new Date().toISOString().split('T')[0]
          }
        ]
      };
    }

    // Ownerships
    else if (endpoint === 'get_ownerships.php') {
      mockResponse = {
        success: true,
        ownerships: [
          {
            id: 1,
            customerId: 1,
            customer: 'Sample Customer',
            lot_label: 'Plot A-1',
            status: 'Reserved'
          }
        ]
      };
    }

    // Cashier - Customers and Payments
    else if (endpoint === 'get_cashier_customers.php') {
      mockResponse = {
        success: true,
        customers: [
          {
            id: 1,
            full_name: 'Sample Customer',
            email: 'customer@example.com',
            lot_details: 'Plot A-1',
            lot_label: 'Plot A-1',
            lot_status: 'active',
            contact_number: '555-0000',
            address: '123 Main St',
            payment_status: 'Active',
            total_paid: 50000,
            pending_amount: 0
          }
        ]
      };
    }

    else if (endpoint === 'get_overdue_payments.php') {
      mockResponse = {
        success: true,
        overdue_lots: []
      };
    }

    else if (endpoint === 'get_intake_payments.php') {
      mockResponse = {
        success: true,
        payments: []
      };
    }

    // Profile
    else if (endpoint === 'get_profile.php') {
      const user = localStorage.getItem('user');
      mockResponse = user ? { success: true, user: JSON.parse(user) } : { success: false };
    }

    else if (endpoint === 'update_profile.php') {
      const body = options.body ? JSON.parse(options.body) : {};
      const user = localStorage.getItem('user');
      const userData = user ? JSON.parse(user) : {};
      const updated = { ...userData, ...body };
      localStorage.setItem('user', JSON.stringify(updated));
      mockResponse = { success: true, user: updated };
    }

    // Default response for unknown endpoints
    else {
      mockResponse = { success: true, data: [] };
    }

    // Return mock response as Response object
    return new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Mock API error:', error);
    return new Response(JSON.stringify({ success: false, message: 'API Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

/**
 * Install mock API interceptor
 * Replaces global fetch with mock API
 */
export const installMockApiInterceptor = () => {
  // Only in frontend-only mode
  const originalFetch = window.fetch;
  window.fetch = (url, options) => {
    // Only intercept API calls
    if (typeof url === 'string' && (url.includes('/api/') || url.includes('.php'))) {
      return mockApiFetch(url, options);
    }
    return originalFetch(url, options);
  };
};
