import Link from 'next/link';
import { Package, Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/currency';
import { CATEGORY_LABELS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ featured: 'desc' }, { created_at: 'desc' }],
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
            Products
          </h1>
          <p className="mt-2 text-walnut-500 dark:text-walnut-400">
            Manage the furniture catalog, pricing, stock, and visibility.
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5" />
            Product Management
          </CardTitle>
          <Badge variant="secondary">{products.length} products</Badge>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="py-8 text-center text-walnut-500">No products found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-walnut-800 dark:text-walnut-200">
                          {product.name}
                        </p>
                        <p className="text-xs text-walnut-500">{product.sku || product.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>{CATEGORY_LABELS[product.category]}</TableCell>
                    <TableCell>
                      {product.price_type === 'INQUIRY'
                        ? 'Inquiry'
                        : formatPrice(Number(product.price))}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{product.stock_type.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-walnut-500">{product.stock} units</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={product.is_active ? 'default' : 'secondary'}>
                          {product.is_active ? 'Active' : 'Hidden'}
                        </Badge>
                        {product.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
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
