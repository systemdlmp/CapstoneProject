import React from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function SectorDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <Button 
        variant="text" 
        color="blue-gray"
        className="w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Go Back
      </Button>
      
      <Card>
        <CardBody className="p-6">
          <div className="flex gap-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div>
              <Typography variant="h5" color="yellow" className="font-bold mb-2">
                Sector Details Not Available
              </Typography>
              <Typography color="blue-gray" className="text-sm">
                The sector detail mapping feature requires backend database access and is not available in this frontend-only demo version. To view detailed sector information and lot management, please use the full system with a complete backend setup.
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


