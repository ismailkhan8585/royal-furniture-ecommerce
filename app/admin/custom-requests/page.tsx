import { FileText } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/currency';
import { CUSTOM_REQUEST_STATUS_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function AdminCustomRequestsPage() {
  const requests = await prisma.customOrderRequest.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Custom Requests
        </h1>
        <p className="mt-2 text-walnut-500 dark:text-walnut-400">
          Manage customer furniture requests, quotations, and production progress.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Customer Request Management
          </CardTitle>
          <Badge variant="secondary">{requests.length} requests</Badge>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="py-8 text-center text-walnut-500">No custom requests found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Furniture</TableHead>
                  <TableHead>Budget / Quote</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-walnut-800 dark:text-walnut-200">
                          {request.request_ref}
                        </p>
                        <p className="text-xs text-walnut-500">
                          {request.created_at.toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{request.customer_name}</p>
                        <p className="text-xs text-walnut-500">{request.customer_phone}</p>
                        <p className="text-xs text-walnut-500">{request.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{request.furniture_type}</p>
                        <p className="text-xs text-walnut-500">
                          {request.room_type || 'Room not specified'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{request.budget_range || 'Not specified'}</p>
                        {request.quoted_price && (
                          <p className="text-xs text-walnut-500">
                            Quote: {formatPrice(Number(request.quoted_price))}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {CUSTOM_REQUEST_STATUS_LABELS[request.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
