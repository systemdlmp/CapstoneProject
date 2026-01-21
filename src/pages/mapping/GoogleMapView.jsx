import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function GoogleMapView() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <Card>
        <CardBody className="p-6">
          <div className="flex gap-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <Typography variant="h5" color="yellow" className="font-bold mb-2">
                Lot Map Not Available
              </Typography>
              <Typography color="blue-gray" className="text-sm">
                The mapping feature requires backend database access and is not available in this frontend-only demo version. To view the interactive lot map, please use the full system with a complete backend setup.
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


