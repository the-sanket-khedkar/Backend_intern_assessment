const express = require('express');
const router = express.Router();

// GET low stock alerts
router.get('/api/companies/:company_id/alerts/low-stock', async (req, res) => {
    const { company_id } = req.params;

    try {
        // Example query (pseudo SQL logic)
        const alerts = await db.query(`
            SELECT 
                p.id AS product_id,
                p.name AS product_name,
                p.sku,
                w.id AS warehouse_id,
                w.name AS warehouse_name,
                i.quantity AS current_stock,
                p.threshold,
                s.id AS supplier_id,
                s.name AS supplier_name,
                s.contact_email
            FROM inventory i
            JOIN products p ON i.product_id = p.id
            JOIN warehouses w ON i.warehouse_id = w.id
            JOIN companies c ON w.company_id = c.id
            LEFT JOIN product_suppliers ps ON ps.product_id = p.id
            LEFT JOIN suppliers s ON s.id = ps.supplier_id
            WHERE c.id = $1
            AND i.quantity < p.threshold
        `, [company_id]);

        // Transform response
        const result = alerts.rows.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            sku: item.sku,
            warehouse_id: item.warehouse_id,
            warehouse_name: item.warehouse_name,
            current_stock: item.current_stock,
            threshold: item.threshold,
            days_until_stockout: 10, // assumed calculation
            supplier: {
                id: item.supplier_id,
                name: item.supplier_name,
                contact_email: item.contact_email
            }
        }));

        return res.status(200).json({
            alerts: result,
            total_alerts: result.length
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;