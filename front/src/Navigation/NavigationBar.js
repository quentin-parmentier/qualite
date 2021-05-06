import React from 'react'
import NavigationItem from './NavigationItem'

export default function Navigation() {
    return (
        <div className="flex justify-center min-w-full space-x-3 h-12">
            <NavigationItem title="Commandes" to="/commande" />
            <NavigationItem title="Fournisseurs" to="/fournisseur" />
        </div>
    )
}
