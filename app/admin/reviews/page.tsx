import { MessageSquare, Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';
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

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      product: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Reviews
        </h1>
        <p className="mt-2 text-walnut-500 dark:text-walnut-400">
          Review customer feedback and moderation status.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            Reviews Management
          </CardTitle>
          <Badge variant="secondary">{reviews.length} reviews</Badge>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-walnut-500">No reviews found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-walnut-800 dark:text-walnut-200">
                          {review.customer_name}
                        </p>
                        <p className="text-xs text-walnut-500">{review.customer_phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{review.product.name}</p>
                        <p className="text-xs text-walnut-500">{review.product.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                        {review.rating}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{review.body}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={review.is_approved ? 'default' : 'outline'}>
                        {review.is_approved ? 'Approved' : 'Pending'}
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
