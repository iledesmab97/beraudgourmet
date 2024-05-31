function AdminLayout({ children }: {children: React.ReactNode}) {
    return (
        <>
            {/* <ProtectedRoute>
                {children}
            </ProtectedRoute> */}
            {children}
        </>
    )
}

export default AdminLayout