<?php

namespace Tests\Unit;

use App\Services\WordSortingService;
use PHPUnit\Framework\TestCase;

class SortingAlgorithmTest extends TestCase
{
    private WordSortingService $sortingService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->sortingService = new WordSortingService();
    }

    public function test_it_sorts_letters_alphabetically(): void
    {
        $result = $this->sortingService->alphabeticalSort('ilutaim');

        $this->assertSame('aiilmtu', $result);
    }

    public function test_it_returns_same_key_for_anagrams(): void
    {
        $first = $this->sortingService->alphabeticalSort('ilutaim');
        $second = $this->sortingService->alphabeticalSort('liituma');

        $this->assertSame($first, $second);
    }

    public function test_it_handles_estonian_characters(): void
    {
        $result = $this->sortingService->alphabeticalSort('õüäö');

        $this->assertSame('äõöü', $result);
    }
    public function test_it_handles_empty_string(): void
    {
        $result = $this->sortingService->alphabeticalSort('');

        $this->assertSame('', $result);
    }
}
