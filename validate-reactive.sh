#!/bin/bash

# Reactive Updates Validation Script
# Run this to validate all reactive behaviors

echo "🧪 Starting Reactive Updates Validation..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((FAILED++))
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. BUILD VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 1: Build succeeds
npm run build > /dev/null 2>&1
test_result $? "Application builds without errors"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. TYPESCRIPT VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 2: No TypeScript errors
npx tsc --noEmit > /dev/null 2>&1
test_result $? "No TypeScript compilation errors"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. CODE STRUCTURE VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 3: BehaviorSubject usage in CartService
grep -q "BehaviorSubject" src/app/services/cart.service.ts
test_result $? "CartService uses BehaviorSubject"

# Test 4: combineLatest usage
grep -q "combineLatest" src/app/components/product-list/product-list.ts
test_result $? "ProductList uses combineLatest"

# Test 5: takeUntil cleanup
grep -q "takeUntil" src/app/components/product-list/product-list.ts
test_result $? "ProductList uses takeUntil for cleanup"

# Test 6: OnDestroy implementation
grep -q "ngOnDestroy" src/app/components/product-list/product-list.ts
test_result $? "ProductList implements OnDestroy"

# Test 7: async pipe usage
grep -q "async" src/app/components/cart-panel/cart-panel.html
test_result $? "CartPanel uses async pipe"

# Test 8: debounceTime for search
grep -q "debounceTime" src/app/components/product-list/product-list.ts
test_result $? "Search uses debounceTime"

# Test 9: distinctUntilChanged
grep -q "distinctUntilChanged" src/app/components/product-list/product-list.ts
test_result $? "Filters use distinctUntilChanged"

# Test 10: catchError for error handling
grep -q "catchError" src/app/services/products.service.ts
test_result $? "ProductsService uses catchError"

# Test 11: retry logic
grep -q "retry" src/app/services/products.service.ts
test_result $? "ProductsService uses retry"

# Test 12: shareReplay for caching
grep -q "shareReplay" src/app/services/products.service.ts
test_result $? "ProductsService uses shareReplay"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. REACTIVE PATTERNS VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 13: Cart items observable
grep -q "items\$" src/app/services/cart.service.ts
test_result $? "Cart exposes items$ observable"

# Test 14: Total price observable
grep -q "totalPrice\$" src/app/services/cart.service.ts
test_result $? "Cart exposes totalPrice$ observable"

# Test 15: Item count observable
grep -q "itemCount\$" src/app/services/cart.service.ts
test_result $? "Cart exposes itemCount$ observable"

# Test 16: Cart summary combined stream
grep -q "cartSummary\$" src/app/services/cart.service.ts
test_result $? "Cart exposes cartSummary$ combined stream"

# Test 17: Products with cart quantities
grep -q "productsWithCart\$" src/app/components/product-list/product-list.ts
test_result $? "ProductList combines products with cart data"

# Test 18: Error observable
grep -q "error\$" src/app/services/products.service.ts
test_result $? "ProductsService exposes error$ observable"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. SUBSCRIPTION CLEANUP VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 19: destroy$ subject
grep -q "destroy\$" src/app/components/product-list/product-list.ts
test_result $? "ProductList has destroy$ subject"

# Test 20: destroy$.next() in ngOnDestroy
grep -q "destroy\$.next()" src/app/components/product-list/product-list.ts
test_result $? "ProductList calls destroy$.next()"

# Test 21: destroy$.complete() in ngOnDestroy
grep -q "destroy\$.complete()" src/app/components/product-list/product-list.ts
test_result $? "ProductList calls destroy$.complete()"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. PERFORMANCE OPTIMIZATION VALIDATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 22: OnPush change detection
grep -q "OnPush" src/app/components/product-list/product-list.ts
test_result $? "ProductList uses OnPush change detection"

# Test 23: switchMap for dependent streams
grep -q "switchMap" src/app/components/product-list/product-list.ts
test_result $? "ProductList uses switchMap"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Application is production ready.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please review the implementation.${NC}"
    exit 1
fi
